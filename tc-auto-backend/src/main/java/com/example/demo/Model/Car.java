package com.example.demo.Model;

import com.example.demo.Enum.GRADE;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Data;
import lombok.Generated;
import lombok.Getter;
import lombok.Setter;
import org.apache.tomcat.jni.Local;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

@Data
@Document (collection = "cars")
@Getter
@Setter
@JsonRootName("data")
public class Car {
    @Id
    private String id;
    private String make;
    private String model;
    private int mileage;
    private int askingPrice;
    private boolean financing;
    private String note;
    private LocalDateTime createdAt;

    private String mainImageRef;

    private String color;

    private int year;

    private String engineGrade;

    private String heatingAndCoolingGrade;

    private String interiorGrade;

    private MultipartFile image;

    public Car(String make, String model, int mileage, int askingPrice, boolean financing, String note, LocalDateTime createdAt, String mainImageRef, String color, int year,
               String engineGrade, String heatingAndCoolingGrade, String interiorGrade) {
        this.make = make;
        this.model = model;
        this.mileage = mileage;
        this.askingPrice = askingPrice;
        this.financing = financing;
        this.note = note;
        this.createdAt = createdAt;
        this.mainImageRef = mainImageRef;
        this.color = color;
        this.year = year;
        this.engineGrade = engineGrade;
        this.heatingAndCoolingGrade = heatingAndCoolingGrade;
        this.interiorGrade  = interiorGrade;
    }

    public Car(){
        super();
    }

}


