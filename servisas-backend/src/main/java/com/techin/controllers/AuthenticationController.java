package com.techin.controllers;

import com.techin.models.ApplicationUser;
import com.techin.models.LoginResponseDTO;
import com.techin.models.RegistrationDTO;
import com.techin.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.security.sasl.AuthenticationException;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public ApplicationUser registerUser(@RequestBody RegistrationDTO body){
        return authenticationService.registerUser(body.getUsername(), body.getPassword());
    }

    @PostMapping("login")
    public LoginResponseDTO loginUser(@RequestBody RegistrationDTO body) throws AuthenticationException {
        return authenticationService.loginUser(body.getUsername(), body.getPassword());
    }
}
