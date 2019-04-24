package com.innowise.authmodule.repository;

import com.innowise.authmodule.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepositoryImpl extends JpaRepository<Role, Long> {

    Optional<Role> findByName(String name);
}
