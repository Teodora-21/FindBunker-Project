package com.FindBunker.controller;

import com.FindBunker.entity.Bunker;
import com.FindBunker.service.BunkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/bunker")
public class BunkerController {
    @Autowired
    BunkerService bunkerService;

    @GetMapping("/all")
    public ResponseEntity findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(bunkerService.findAll());
    }

    @GetMapping
    public ResponseEntity getById(@RequestParam(name = "bunkerId") int bunkerId) {
        return ResponseEntity.status(HttpStatus.OK).body(bunkerService.getById(bunkerId));
    }

    @PostMapping
    public ResponseEntity createBunker(@RequestBody Bunker bunker) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bunkerService.save(bunker));
    }

    @DeleteMapping
    public ResponseEntity deleteBunker(@RequestParam(name = "bunkerId") int bunkerId) {
        return ResponseEntity.status(HttpStatus.OK).body(bunkerService.delete(bunkerId));
    }
}
