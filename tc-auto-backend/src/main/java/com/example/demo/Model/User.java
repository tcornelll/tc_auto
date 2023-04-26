package com.example.demo.Model;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document (collection = "admin_user")
@Getter
@Setter
@JsonRootName("data")
@AllArgsConstructor
public class User {
    String username;
    String password;
}
