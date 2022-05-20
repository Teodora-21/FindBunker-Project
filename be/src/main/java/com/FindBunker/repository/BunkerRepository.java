package com.FindBunker.repository;

import com.FindBunker.entity.Bunker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BunkerRepository extends JpaRepository<Bunker, Integer> {

}

