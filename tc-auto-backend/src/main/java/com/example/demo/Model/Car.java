package com.example.demo.Model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Document
@Getter
@Setter
public class Car {
    @Id
    private String id;
    private String make;
    private String model;
    private int mileage;
    private int askingPrice;
    private boolean financing;
    private List<String> notes;
    private LocalDateTime createdAt;

    private String mainImageRef;

    private String color;

    private int year;

    public Car(String make, String model, int mileage, int askingPrice, boolean financing, List<String> notes, LocalDateTime createdAt, String mainImageRef, String color, int year) {
        this.make = make;
        this.model = model;
        this.mileage = mileage;
        this.askingPrice = askingPrice;
        this.financing = financing;
        this.notes = notes;
        this.createdAt = createdAt;
        this.mainImageRef = mainImageRef;
        this.color = color;
        this.year = year;
    }

    public Car(){

    }
}
