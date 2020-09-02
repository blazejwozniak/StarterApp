package com.bw.starter.controller;

import com.bw.starter.model.Todo;
import com.bw.starter.model.User;
import com.bw.starter.repository.TodoJpaRepository;
import com.bw.starter.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200")
public class TaskJpaController {

    @Autowired
    private TodoJpaRepository todoJpaRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users/{username}/todos")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<Todo> getAllTasks(@PathVariable String username){
        return userRepository.findByUsername(username).get().getTodos();
    }

    @GetMapping("/users/{username}/todos/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public Todo getTodo(@PathVariable String username, @PathVariable long id){

        return todoJpaRepository.findById(id).get();
    }

    @DeleteMapping("/users/{username}/todos/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long id){
        Optional<User> user = userRepository.findByUsername(username);

        if (!user.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        boolean foundTask = user.get().getTodos().stream()
                .anyMatch(todo -> todo.getId().equals(id));

        if (foundTask) {
            todoJpaRepository.deleteById(id);
        }
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/users/{username}/todos/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Todo> updateTodo(@PathVariable String username, @PathVariable long id, @RequestBody Todo todo){

        Todo updatedTodo = todoJpaRepository.save(todo);
        return new ResponseEntity<Todo>(todo, HttpStatus.OK);
    }

    @PostMapping("/users/{username}/todos")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Todo> createTodo(@PathVariable String username, @RequestBody Todo todo){


        Todo createdTodo = todoJpaRepository.save(todo);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdTodo.getId()).toUri();

        return ResponseEntity.created(uri).build();
    }
}
