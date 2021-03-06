package com.FindBunker.controller;

import com.FindBunker.entity.Rezervation;
import com.FindBunker.service.RezervationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/rezervation")
public class RezervationController {
    @Autowired
    RezervationService rezervationService;

    @GetMapping("/all")
    public ResponseEntity findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(rezervationService.findAll());
    }

    @GetMapping
    public ResponseEntity getById(@RequestParam(name = "rezervationId") int rezervationId) {
        return ResponseEntity.status(HttpStatus.OK).body(rezervationService.getById(rezervationId));
    }

    @GetMapping("/bunkerId")
    public ResponseEntity getByBunkerId(@RequestParam(name = "bunker_id") int bunker_id) {
        return ResponseEntity.status(HttpStatus.OK).body(rezervationService.getByBunkerId(bunker_id));
    }

    @GetMapping("/userId")
    public ResponseEntity getByUserId(@RequestParam(name = "refugee_id") int refugee_id) {
        return ResponseEntity.status(HttpStatus.OK).body(rezervationService.getByUserId(refugee_id));
    }

    @PostMapping
    public ResponseEntity createRezervation(@RequestBody Rezervation rezervation) {
        return ResponseEntity.status(HttpStatus.CREATED).body(rezervationService.save(rezervation));
    }

    @DeleteMapping
    public ResponseEntity deleteRezervation(@RequestParam(name = "rezervationId") int rezervationId) {
        return ResponseEntity.status(HttpStatus.OK).body(rezervationService.delete(rezervationId));
    }
}