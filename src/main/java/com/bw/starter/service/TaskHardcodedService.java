package com.bw.starter.service;

import com.bw.starter.model.Todo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskHardcodedService {

    private static List<Todo> tasks = new ArrayList<>();
    private static long idCounter = 0L;


//    static {
//        tasks.add(new Todo(++idCounter, "admin", "Learn more angular", new Date(), false));
//        tasks.add(new Todo(++idCounter, "admin", "Learn to code", new Date(), false));
//        tasks.add(new Todo(++idCounter, "admin", "Read book", new Date(), false));
//        tasks.add(new Todo(++idCounter, "admin", "Emigrate abroad", new Date(), false));
//    }

    public List<Todo> findAll(){
        return tasks;
    }

    public Todo deleteById(long id){
        Todo todo = findById(id);

        if(todo == null) return null;

        if(tasks.remove(todo)){
            return todo;
        }
        return null;
    }

    public Todo findById(long id){
        for (Todo todo : tasks){
            if (todo.getId() == id){
                return todo;
            }
        }
        return null;
    }

    public Todo save(Todo todo){
        if(todo.getId() == -1 || todo.getId() == 0){
            todo.setId(++idCounter);
        }else {
            deleteById(todo.getId());
        }
        tasks.add(todo);
        return todo;
    }

}
