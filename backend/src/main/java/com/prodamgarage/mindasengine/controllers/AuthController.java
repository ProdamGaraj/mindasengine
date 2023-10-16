package com.prodamgarage.mindasengine.controllers;

import com.prodamgarage.mindasengine.models.User;
import com.prodamgarage.mindasengine.payload.request.LoginRequest;
import com.prodamgarage.mindasengine.payload.request.SignupRequest;
import com.prodamgarage.mindasengine.payload.response.JwtResponse;
import com.prodamgarage.mindasengine.payload.response.MessageResponse;
import com.prodamgarage.mindasengine.repository.UserRepository;
import com.prodamgarage.mindasengine.security.jwt.JwtUtils;
import com.prodamgarage.mindasengine.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    JwtUtils jwtUtils;
    @Async
    @PostMapping("/signin")
    public CompletableFuture<ResponseEntity<?>> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return CompletableFuture.completedFuture(ResponseEntity
                .ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername())));
    }
    @Async
    @PostMapping("/signup")
    public CompletableFuture<ResponseEntity<?>> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return CompletableFuture.completedFuture(ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!")));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(), encoder.encode(signUpRequest.getPassword()));

        userRepository.save(user);

        return CompletableFuture.completedFuture(ResponseEntity.ok(new MessageResponse("User registered successfully!")));
    }
}
