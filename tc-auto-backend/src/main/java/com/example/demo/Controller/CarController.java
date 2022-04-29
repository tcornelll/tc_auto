package com.example.demo.Controller;

import com.example.demo.Model.LoadFile;
import com.example.demo.Service.CarService;
import com.example.demo.Model.Car;
import com.example.demo.Service.FileService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.apache.tomcat.jni.Local;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.rmi.ServerException;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/car")
@AllArgsConstructor
public class CarController {

    private final CarService carService;

    private final FileService fileService;

    @GetMapping
    @CrossOrigin
    public List<Car> fetchAllCars() {
        return carService.getAllCars();
    }

    @PostMapping
    @CrossOrigin
    public Car create(@RequestParam("car") String newCar, @RequestParam("file")MultipartFile file) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Car freshCar = objectMapper.readValue(newCar, Car.class);
        String imageRef = fileService.addFile(file);
        freshCar.setMainImageRef(imageRef);
        Car car = carService.save(freshCar);
        return car;
    }

    @DeleteMapping
    @CrossOrigin
    public String delete(@RequestParam String id){
        return carService.deleteCarById(id);
    }

    @GetMapping("/{carId}/image")
    @CrossOrigin
    public ResponseEntity<ByteArrayResource> getImage(@PathVariable("carId") String carId) throws IOException {
        LoadFile loadFile = carService.getMainImage(carId);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(loadFile.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment: filename-\"" + loadFile.getFilename() + "\"")
                .body(new ByteArrayResource(loadFile.getFile()));
    }

}
