package com.FindBunker.repository;

import com.FindBunker.entity.Rezervation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RezervationRepository extends JpaRepository<Rezervation, Integer> {

}
