package com.FindBunker.repository;

import com.FindBunker.entity.Rezervation;
import com.FindBunker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RezervationRepository extends JpaRepository<Rezervation, Integer> {
    @Query(value = "Select * FROM rezervation r WHERE r.bunker_id = ?1", nativeQuery = true)
    public Optional<Rezervation> getByBunkerId(int bunker_id);

    @Query(value = "Select * FROM rezervation r WHERE r.refugee_id = ?1", nativeQuery = true)
    public Optional<Rezervation> getByUserId(int refugee_id);
}
