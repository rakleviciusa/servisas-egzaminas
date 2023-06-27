package com.techin.controllers;

import com.techin.models.Servisas;
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
public class ServisasController {

    @Autowired
    private ServisasRepository servisasRepository;

    @GetMapping("allServisai")
    public ResponseEntity<List<Servisas>> getAllServisai(){
        try {
            List<Servisas> servisai = new ArrayList<>();
            servisasRepository.findAll().forEach(servisai::add);

            if(servisai.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(servisai, HttpStatus.OK);
        }

        catch (Exception exception){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getServisasById/{id}")
    public ResponseEntity<Servisas> getServisasById(@PathVariable Long id){
        Optional<Servisas> servisasData = servisasRepository.findById(id);

        if (servisasData.isPresent()){
            return new ResponseEntity<>(servisasData.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/addServisas")
    public ResponseEntity<Servisas> addServisas(@RequestBody Servisas servisas){

            Servisas mealObject = servisasRepository.save(servisas);
            return new ResponseEntity<>(mealObject, HttpStatus.OK);

    }

    @PostMapping("/updateServisasById/{id}")
    public ResponseEntity<Servisas> updateServisasById(@PathVariable Long id, @RequestBody Servisas servisas){
        Optional<Servisas> servisasData = servisasRepository.findById(id);

        if (servisasData.isPresent()){
            Servisas updatedServisas = servisasData.get();
            updatedServisas.setName(servisas.getName());
            updatedServisas.setAddress(servisas.getAddress());
            updatedServisas.setManager(servisas.getManager());

            Servisas servisasObject = servisasRepository.save(updatedServisas);

            return new ResponseEntity<>(servisasObject, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/deleteServisasById/{id}")
    public ResponseEntity<Servisas> deleteServisasById(@PathVariable Long id){
        servisasRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
