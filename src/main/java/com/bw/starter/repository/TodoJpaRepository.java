package com.bw.starter.repository;

import com.bw.starter.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoJpaRepository extends JpaRepository <Todo, Long> {

}
