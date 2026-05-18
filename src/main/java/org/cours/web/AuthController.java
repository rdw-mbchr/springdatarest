package org.cours.web;

import org.cours.modele.*;
import org.cours.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3001")
public class AuthController {

    @Autowired private AuthenticationManager authManager;
    @Autowired private JwtService jwtService;
    @Autowired private UserRepo userRepo;
    @Autowired private PasswordEncoder passwordEncoder;

    // Login avec JWT
    @PostMapping("/login")
    public ResponseEntity<String> login(
            @RequestBody LoginRequest request) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()));

        String token =
                jwtService.generateToken(request.getUsername());
        return ResponseEntity.ok(token);
    }

    // Register
    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody LoginRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(
                passwordEncoder.encode(request.getPassword()));
        user.setProvider("local");
        user.setRole("USER");
        userRepo.save(user);
        return ResponseEntity.ok("Utilisateur créé !");
    }
}