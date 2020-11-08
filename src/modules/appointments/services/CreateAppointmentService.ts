import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '@models/appointements/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../erros/AppError';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {


  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointementInSameDate = await appointmentRepository.findByDate(
      appointmentDate,
    );
    if (findAppointementInSameDate) {
      throw new AppError('This appointement is already booked');
    }
    const appointment = appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });
    await appointmentRepository.save(appointment)

    return appointment;
  }
}

export default CreateAppointmentService;
