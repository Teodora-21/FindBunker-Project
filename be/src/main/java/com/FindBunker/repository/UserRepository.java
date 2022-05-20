package com.FindBunker.repository;

import com.FindBunker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query(value = "Select * FROM user u WHERE u.identity_id = ?1", nativeQuery = true)
    public Optional<User> getByIdentityId(String identifyId);
}
