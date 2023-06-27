package com.techin.controllers;

import com.techin.models.Meistras;
import com.techin.models.Servisas;
import com.techin.repository.MeistrasRepository;
import com.techin.repository.ServisasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class MeistrasController {

    @Autowired
    private MeistrasRepository meistrasRepository;

    @GetMapping("allMeistrai")
    public ResponseEntity<List<Meistras>> getAllMeistrai(){
        try {
            List<Meistras> meistrai = new ArrayList<>();
            meistrasRepository.findAll().forEach(meistrai::add);

            if(meistrai.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(meistrai, HttpStatus.OK);
        }
        catch (Exception exception){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getMeistrasById/{id}")
    public ResponseEntity<Meistras> getMeistrasById(@PathVariable Long id){
        Optional<Meistras> meistrasData = meistrasRepository.findById(id);

        if (meistrasData.isPresent()){
            return new ResponseEntity<>(meistrasData.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/addMeistras")
    public ResponseEntity<Meistras> addMeistras(@RequestBody Meistras meistras){

        Meistras meistrasObject = meistrasRepository.save(meistras);
        return new ResponseEntity<>(meistrasObject, HttpStatus.OK);

    }

    @PostMapping("/updateMeistrasById/{id}")
    public ResponseEntity<Meistras> updateMeistrasById(@PathVariable Long id, @RequestBody Meistras meistras){
        Optional<Meistras> meistrasData = meistrasRepository.findById(id);

        if (meistrasData.isPresent()){
            Meistras updatedMeistras = meistrasData.get();
            updatedMeistras.setFirstName(meistras.getFirstName());
            updatedMeistras.setLastName(meistras.getLastName());
            updatedMeistras.setSpecialization(meistras.getSpecialization());
            updatedMeistras.setCity(meistras.getCity());

            Meistras meistrasObject = meistrasRepository.save(updatedMeistras);

            return new ResponseEntity<>(meistrasObject, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/deleteMeistrasById/{id}")
    public ResponseEntity<Meistras> deleteMeistrasById(@PathVariable Long id){
        meistrasRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
