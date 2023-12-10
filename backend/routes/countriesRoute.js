import express from 'express';
import {Country} from '../models/countryModel.js';



const router = express.Router();


router.post('/', (request, response) => {
    try {
      if (
        !request.body.name ||
        !request.body.population ||
        !request.body.area
      ) {
        return response.status(400).send({
          message: 'Send all required fields: name, population, area',
        });
      }
      const newCountry = {
        name: request.body.name,
        population: request.body.population,
        area: request.body.area,
      };
      
      const country =  Country.create(newCountry);
      
      return response.status(201).send(country);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
    }); 
    
router.get('/', async (request,response) => {
        try{
            const countries = await Country.find({});
            return response.status(200).json({
                count: countries.length,
                data: countries
            });
        }
        catch (error) {
            console.log(error.message);
            response.status(500).send({message:error.message});
        }
    });
    
router.get('/:id', async (request,response) => {
        try{
            const {id} = request.params;
            const countries = await Country.findById(id);
            return response.status(200).json({
                count: countries.length,
                data: countries
            });
        }
        catch (error) {
            console.log(error.message);
            response.status(500).send({message:error.message});
        } 
    });
    
router.put('/:id', async (request,response) => {
        try{
            if (
                !request.body.name ||
                !request.body.population ||
                !request.body.area
              ){
                return response.status(400).send({
                    message: 'Send all required fields: name, population, area',
                  });
              }
              const {id} = request.params; 
              const result = await Country.findByIdAndUpdate(id,request.body);
              if(!result){
                return response.status(404).json({ message: 'Country not found' });
              }
    
              return response.status(200).send({ message: 'Country updated successfully' });
        }
        catch (error) {
            console.log(error.message);
            response.status(500).send({message:error.message});
        } 
    });
    
router.delete('/:id', async (request,response) => {
        try{
            const {id} = request.params;
            const result = await Country.findByIdAndDelete(id);
    
            if(!result){
                return response.status(404).json({ message: 'Country not found' });
            }
    
            return response.status(200).send({message: 'Country deleted successfully'});
        } catch(error){
            console.log(error.message);
            response.status(500).send({message:error.message});
        }
    });

export default router;