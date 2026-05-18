package org.cours.service;

import org.cours.modele.Voiture;
import org.cours.modele.VoitureRepo;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class VoitureAIService {

    private final ChatClient chatClient;

    @Autowired
    private VoitureRepo voitureRepo;

    public VoitureAIService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    // ===== 1. Chatbot conseiller metier =====
    public String chat(String userMessage) {
        List<Voiture> voitures = StreamSupport
                .stream(voitureRepo.findAll().spliterator(), false)
                .collect(Collectors.toList());

        StringBuilder catalogue = new StringBuilder();
        for (Voiture v : voitures) {
            catalogue.append(String.format(
                    "- %s %s (%s, %d, %d MAD)\n",
                    v.getMarque(), v.getModele(),
                    v.getCouleur(), v.getAnnee(), v.getPrix()));
        }

        String systemPrompt = "Tu es un expert commercial du Magasin "
                + "de Voitures MIOLA.\nVoici notre catalogue actuel :\n"
                + catalogue.toString()
                + "\nAide le client a choisir la meilleure voiture selon "
                + "ses besoins. Reponds en francais, max 4 phrases.";

        return chatClient.prompt()
                .system(systemPrompt)
                .user(userMessage)
                .call()
                .content();
    }

    // ===== 2. Description commerciale automatique =====
    public String generateDescription(Long voitureId) {
        Voiture v = voitureRepo.findById(voitureId)
                .orElseThrow(() ->
                        new RuntimeException("Voiture non trouvee"));

        List<Voiture> memeMarque = StreamSupport
                .stream(voitureRepo.findAll().spliterator(), false)
                .filter(x -> x.getMarque().equals(v.getMarque()))
                .collect(Collectors.toList());

        double prixMoyen = memeMarque.stream()
                .mapToInt(Voiture::getPrix)
                .average()
                .orElse(v.getPrix());

        String positionPrix = v.getPrix() < prixMoyen
                ? "prix competitif en dessous de la moyenne"
                : "vehicule premium au-dessus de la moyenne";

        String prompt = "Genere une fiche commerciale pour :\n"
                + "- Marque/Modele : " + v.getMarque()
                + " " + v.getModele() + "\n"
                + "- Couleur : " + v.getCouleur() + "\n"
                + "- Annee : " + v.getAnnee() + "\n"
                + "- Prix : " + v.getPrix() + " MAD ("
                + positionPrix + ")\n"
                + "Inclure : slogan, points forts, public cible. "
                + "Style commercial professionnel en francais.";

        return chatClient.prompt()
                .user(prompt)
                .call()
                .content();
    }

    // ===== 3. Recommandation par budget =====
    public String recommendByBudget(int budget) {
        List<Voiture> disponibles = StreamSupport
                .stream(voitureRepo.findAll().spliterator(), false)
                .filter(v -> v.getPrix() <= budget)
                .sorted((a, b) -> b.getAnnee() - a.getAnnee())
                .collect(Collectors.toList());

        if (disponibles.isEmpty()) {
            List<Voiture> proches = StreamSupport
                    .stream(voitureRepo.findAll().spliterator(), false)
                    .sorted((a, b) -> a.getPrix() - b.getPrix())
                    .limit(3)
                    .collect(Collectors.toList());

            StringBuilder suggestions = new StringBuilder();
            for (Voiture v : proches) {
                suggestions.append("- ")
                        .append(v.getMarque()).append(" ")
                        .append(v.getModele()).append(" : ")
                        .append(v.getPrix()).append(" MAD\n");
            }

            return chatClient.prompt()
                    .user("Budget client : " + budget
                            + " MAD, aucune voiture disponible. "
                            + "Les moins cheres sont :\n"
                            + suggestions.toString()
                            + "\nConseille-le professionnellement en francais.")
                    .call()
                    .content();
        }

        StringBuilder voituresStr = new StringBuilder();
        for (Voiture v : disponibles) {
            voituresStr.append("- ")
                    .append(v.getMarque()).append(" ")
                    .append(v.getModele()).append(" (")
                    .append(v.getAnnee()).append(") : ")
                    .append(v.getPrix()).append(" MAD\n");
        }

        return chatClient.prompt()
                .user("Budget : " + budget + " MAD\n"
                        + "Voitures disponibles :\n"
                        + voituresStr.toString()
                        + "\nRecommande la meilleure option avec justification "
                        + "en francais.")
                .call()
                .content();
    }

    // ===== 4. Analyse du stock metier =====
    public String analyseStock() {
        List<Voiture> voitures = StreamSupport
                .stream(voitureRepo.findAll().spliterator(), false)
                .collect(Collectors.toList());

        long total = voitures.size();

        double prixMoyen = voitures.stream()
                .mapToInt(Voiture::getPrix)
                .average()
                .orElse(0);

        String marquePopulaire = voitures.stream()
                .collect(Collectors.groupingBy(
                        Voiture::getMarque, Collectors.counting()))
                .entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("N/A");

        StringBuilder details = new StringBuilder();
        for (Voiture v : voitures) {
            details.append("- ")
                    .append(v.getMarque()).append(" ")
                    .append(v.getModele()).append(" ")
                    .append(v.getAnnee()).append(" : ")
                    .append(v.getPrix()).append(" MAD\n");
        }

        return chatClient.prompt()
                .user("Analyse ce stock pour le directeur :\n"
                        + "Total : " + total + " voitures\n"
                        + "Prix moyen : " + String.format("%.0f", prixMoyen)
                        + " MAD\n"
                        + "Marque dominante : " + marquePopulaire + "\n"
                        + "Detail :\n" + details.toString()
                        + "\nDonne une analyse metier : points forts, "
                        + "opportunites, recommandations strategiques. "
                        + "Style rapport de direction en francais.")
                .call()
                .content();
    }
}