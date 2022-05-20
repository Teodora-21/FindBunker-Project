package com.FindBunker.service;

import com.FindBunker.entity.Rezervation;
import com.FindBunker.repository.RezervationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RezervationService {
    @Autowired
    RezervationRepository rezervationRepository;

    public List<Rezervation> findAll() {
        return rezervationRepository.findAll();
    }

    public Rezervation getById(int id) {
        return rezervationRepository.findById(id).get();
    }

    public Rezervation save(Rezervation rezervation) {
        return rezervationRepository.save(rezervation);
    }

    public Rezervation delete(int rezervationId) {
        Rezervation rezervation = getById(rezervationId);
        rezervationRepository.delete(rezervation);
        return rezervation;
    }
}