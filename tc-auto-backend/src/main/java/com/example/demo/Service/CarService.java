package com.example.demo.Service;

import com.example.demo.Model.Car;
import com.example.demo.Repo.CarRepository;
import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class CarService {

    private final CarRepository carRepo;


    @Autowired
    private GridFsTemplate tremplate;

    @Autowired
    private GridFsOperations operations;

    public List<Car> getAllCars() {
        return carRepo.findAll();
    }

    public Car save(Car newCar){
        newCar.setCreatedAt(LocalDateTime.now());
        return carRepo.save(newCar);
    }

    public String deleteCarById(String id){
        try{
            carRepo.deleteById(id);
            return "Car deleted";
        }
        catch(Exception e){
            return e.getMessage();
        }
    }

    public Car findCarById(String carId){
        Car retrievedCar = carRepo.findById(carId).get();
        if(retrievedCar != null){
            return retrievedCar;
        }
        else {
            return null;
        }
    }

    public Car updateCarById(String carId, Car newCar){
        Optional<Car> findCarQuery = carRepo.findById(carId);
        Car car = findCarQuery.get();
        car.setId(newCar.getId());
        car.setColor(newCar.getColor());
        car.setMake(newCar.getMake());
        car.setModel(newCar.getModel());
        car.setFinancing(newCar.isFinancing());
        car.setMileage(newCar.getMileage());
        car.setYear(newCar.getYear());
        car.setNotes(newCar.getNotes());
        car.setAskingPrice(newCar.getAskingPrice());
        return carRepo.save(car);
    }


}
