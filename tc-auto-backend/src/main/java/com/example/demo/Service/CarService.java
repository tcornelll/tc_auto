package com.example.demo.Service;

import com.example.demo.Model.Car;
import com.example.demo.Model.LoadFile;
import com.example.demo.Repo.CarRepository;
import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Service
public class CarService {

    private final CarRepository carRepo;

    private final FileService fileService;

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

    public LoadFile getMainImage(String carId) throws IOException {
        Car car = this.findCarById(carId);
        return fileService.downloadFile(car.getMainImageRef());
    }


}
