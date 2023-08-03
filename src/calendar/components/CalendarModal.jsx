import { useState } from 'react';
import { useMemo } from 'react';
import Modal from 'react-modal';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'

import { addHours, differenceInSeconds } from 'date-fns';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';

import { useUiStore } from '../../hooks';

registerLocale('es', es);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: 'David',
    notes: 'Notas',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if (!formSubmitted) return '';

    return (formValues.title.trim().length <= 0)
      ? 'is-invalid'
      : '';
  }, [formValues.title, formSubmitted]);

  const dateStartClass = useMemo(() => {
    if (!formSubmitted) return '';

    return (!formValues.start)
      ? 'is-invalid'
      : '';
  }, [formValues.start, formSubmitted]);

  const dateEndClass = useMemo(() => {
    if (!formSubmitted) return '';

    const diference = differenceInSeconds(formValues.end, formValues.start);

    return (!formValues.end || isNaN(diference) || diference <= 0)
      ? 'is-invalid'
      : '';
  }, [formValues.end, formValues.start, formSubmitted]);

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  }

  const onDateChange = (e, changing) => {
    setFormValues({
      ...formValues,
      [changing]: e,
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    const diference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(diference) || diference <= 0) {
      Swal.fire(
        'Fechas Incorectas',
        'Revisa las fechas del evento',
        'error'
      );
      return;
    }

    if (formValues.title.trim().length <= 0) return;

    console.log(formValues);
  }

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={closeDateModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form onSubmit={onSubmit} className="container">

        <div className="form-group mb-2 d-flex flex-column">
          <label className='d-flex'>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            onChange={(e) => onDateChange(e, 'start')}
            className={`form-control ${dateStartClass}`}
            dateFormat="dd/MM/yyyy HH:mm"
            showTimeSelect
            locale="es"
            timeCaption='Hora'
          />
        </div>

        <div className="form-group mb-2 d-flex flex-column">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start ?? new Date()}
            minTime={formValues.start ?? new Date()}
            maxTime={new Date(formValues.start ?? new Date()).setHours(23, 59, 59)}
            selected={formValues.end}
            onChange={(e) => onDateChange(e, 'end')}
            className={`form-control ${dateEndClass}`}
            dateFormat="dd/MM/yyyy HH:mm"
            showTimeSelect
            locale="es"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </Modal>
  )
}
