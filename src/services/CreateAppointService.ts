import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request{
  provider: string;
  date: Date;
}

class CreateAppointmentService{
  private appointmentRepository: AppointmentsRepository;
  constructor(appointmentRepository: AppointmentsRepository){
    this.appointmentRepository = appointmentRepository;
  }
  public execute({provider, date}: Request): Appointment{
  const appointmentDate = startOfHour(date);
  
  const findAppointementInSameDate = this.appointmentRepository.findByDate(appointmentDate);
  if(findAppointementInSameDate){
    throw Error('This appointement is already booked');
  }
  const appointment = this.appointmentRepository.create({
    provider,
    date: appointmentDate,
  });

  return appointment;
  }
}

export default CreateAppointmentService;