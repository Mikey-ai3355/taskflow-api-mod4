package sg.edu.ntu.taskflow_api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter 
@NoArgsConstructor
@AllArgsConstructor 
public class Task {
    
    private Long id; // Unique identifier for the task
    private String title; // Title of the task
    private boolean completed; // Status indicating if the task is completed; default to false

}
