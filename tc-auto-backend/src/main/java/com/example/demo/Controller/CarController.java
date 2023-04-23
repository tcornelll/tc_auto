package com.example.demo.Controller;

import com.example.demo.Service.CarService;
import com.example.demo.Model.Car;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.apache.tomcat.jni.Local;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.rmi.ServerException;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/car")
@AllArgsConstructor
public class CarController {

    private final CarService carService;

    @GetMapping
    @CrossOrigin
    public List<Car> fetchAllCars() {
        return carService.getAllCars();
    }

    @PostMapping
    @CrossOrigin
    public Car create(@RequestBody Car newCar) throws IOException {

        //String imageRef = fileService.addFile(image);
        //newCar.setMainImageRef(imageRef);
        Car car = carService.save(newCar);
        return car;
    }

    @DeleteMapping
    @CrossOrigin
    public String delete(@RequestParam("id") String id){
        return carService.deleteCarById(id);
    }

    @PutMapping
    @CrossOrigin
    public Car update(@RequestBody Car newCar) throws IOException {
        String id = newCar.getId();
        System.out.println(newCar);
        Car car = carService.updateCarById(newCar.getId(), newCar);
        return car;
    }


}
