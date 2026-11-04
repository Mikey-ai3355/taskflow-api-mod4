package sg.edu.ntu.taskflow_api.repository;

import org.springframework.stereotype.Repository;
import java.util.Optional;
import sg.edu.ntu.taskflow_api.model.Task;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;

@Repository 
public class TaskRepository {

    private final Map<Long, Task> tasks = new HashMap<>();
    private long nextId = 1; // Counter for generating unique task IDs
    
    public List<Task> findAll() {
        return new ArrayList<>(tasks.values());
    }

    public Optional<Task> findById(Long id) {
        return Optional.ofNullable(tasks.get(id));
    }

    public Task save(Task task) {
        if (task.getId() == null) {
            task.setId(nextId++);
        }
        tasks.put(task.getId(), task);
        return task;
    }

    public void deleteById(Long id) {
        tasks.remove(id);
    }
}
