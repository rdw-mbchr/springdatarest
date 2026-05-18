package org.cours.security;

import org.cours.modele.User;
import org.cours.modele.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        User user = userRepo.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "User not found: " + username));

        // Si utilisateur Google, password = chaîne vide
        String password = user.getPassword() != null
                ? user.getPassword()
                : "";

        return org.springframework.security.core.userdetails.User
                .builder()
                .username(user.getUsername())
                .password(password)
                .roles(user.getRole() != null ? user.getRole() : "USER")
                .build();
    }
}