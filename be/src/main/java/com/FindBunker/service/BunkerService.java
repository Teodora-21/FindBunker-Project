package com.FindBunker.service;

import com.FindBunker.entity.Bunker;
import com.FindBunker.repository.BunkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BunkerService {
    @Autowired
    BunkerRepository bunkerRepository;

    public List<Bunker> findAll() {
        return bunkerRepository.findAll();
    }

    public Bunker getById(int id) {
        return bunkerRepository.findById(id).get();
    }

    public Bunker save(Bunker bunker) {
        return bunkerRepository.save(bunker);
    }
    public Bunker delete(int bunkerId) {
        Bunker bunker = getById(bunkerId);
        bunkerRepository.delete(bunker);
        return bunker;
    }
}