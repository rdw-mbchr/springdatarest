package org.cours;

import org.cours.modele.Voiture;
import org.cours.modele.VoitureRepo;
import org.cours.modele.User;
import org.cours.modele.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class SpringDataRest {

	@Autowired
	private VoitureRepo repository;

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(SpringDataRest.class, args);
	}

	@Bean
	CommandLineRunner runner() {
		return args -> {


			// Utilisateur admin (créé seulement s'il n'existe pas)
			if (!userRepo.findByUsername("admin").isPresent()) {
				User admin = new User();
				admin.setUsername("admin");
				admin.setPassword(passwordEncoder.encode("admin123"));
				admin.setEmail("admin@test.com");
				admin.setProvider("local");
				admin.setRole("USER");
				userRepo.save(admin);
				System.out.println("Utilisateur admin créé !");
			}
		};
	}
}