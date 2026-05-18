package org.cours.security;

import jakarta.servlet.http.*;
import org.cours.modele.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.*;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2SuccessHandler
        extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired private JwtService jwtService;
    @Autowired private UserRepo userRepo;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication)
            throws IOException {

        OAuth2User oauthUser =
                (OAuth2User) authentication.getPrincipal();

        String email = oauthUser.getAttribute("email");
        String name  = oauthUser.getAttribute("name");

        // Créer ou récupérer l'utilisateur
        User user = userRepo.findByEmail(email)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setUsername(name);
                    newUser.setEmail(email);
                    newUser.setProvider("google");
                    newUser.setRole("USER");
                    return userRepo.save(newUser);
                });

        // Générer le JWT
        String token = jwtService.generateToken(user.getUsername());

        // Rediriger vers React avec le token
        response.sendRedirect(
                "http://localhost:3001/oauth2/callback?token=" + token);
    }
}