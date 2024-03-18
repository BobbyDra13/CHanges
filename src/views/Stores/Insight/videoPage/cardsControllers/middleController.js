import React, { useState } from 'react';
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { Autocomplete, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Card = ({ setIsAnnotation, onOkClick }) => {
  const [inputZone, setZoneValue] = useState('');
  const [inputGate, setGateValue] = useState('');
  const [autocompleteOptions, setAutocompleteOptions] = useState(['Phones', 'Sales', 'Accessories']);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedZoneIndex, setSelectedZoneIndex] = useState(null);
  const [isDefineAreaModalOpen, setIsDefineAreaModalOpen] = useState(false);
  const [currentZoneName, setCurrentZoneName] = useState('');

  const updateAutocompleteOptions = (newOption) => {
    const updatedOptions = Array.from(new Set([...autocompleteOptions, newOption])); // Ensure uniqueness
    setAutocompleteOptions(updatedOptions);
  };

  const getRandomColorClass = () => {
    const colorClasses = [
      'bg-red-500',
      'bg-green-500',
      'bg-blue-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-indigo-500',
      'bg-pink-500',
      'bg-orange-500'
    ];
    const randomIndex = Math.floor(Math.random() * colorClasses.length);
    return colorClasses[randomIndex];
  };

  const handleZoneSubmit = (newValue) => {
    if (!newValue.trim()) return; // Check if the input is not just empty spaces

    const newZone = {
      icon: <div className={`h-full w-full rounded-full ${getRandomColorClass()}`}></div>,
      text: newValue
    };

    setZones((zones) => [...zones, newZone]); // Update the state with the new zone
    setZoneValue(''); // Clear the input field
    updateAutocompleteOptions(newValue); // Update autocomplete options with the new zone
    setShowAutocomplete(false);
    setCurrentZoneName(newValue);
    setIsDefineAreaModalOpen(true);
  };

  const handleGates = (e) => {
    setGateValue(e.target.value);
  };

  const handleAddGates = (e) => {
    e.preventDefault();
    if (inputGate.trim() !== '') {
      const lastIcon = gates[gates.length - 1].icon; // Get the icon of the new last element
      gates.pop();
      gates.push({ icon: lastIcon, text: inputGate });
      setGateValue('');
    }
  };

  const [zones, setZones] = useState([
    { icon: <div className="h-full w-full rounded-full bg-blue-300"></div>, text: 'Phones' },
    { icon: <div className="h-full w-full rounded-full bg-blue-500"></div>, text: 'Sales' },
    { icon: <div className="h-full w-full rounded-full bg-blue-700"></div>, text: 'Accessories' }
  ]);

  const addEmptyZone = () => {
    if (zones.length > 0 && !zones[zones.length - 1]?.text) return;
    setShowAutocomplete(true);
  };

  const renderAutocompleteForZones = () => {
    if (!showAutocomplete) return null;
    return (
      <Autocomplete
        freeSolo
        options={autocompleteOptions}
        value={inputZone}
        onChange={(event, newValue) => handleZoneSubmit(newValue)}
        onInputChange={(event, newValue) => setZoneValue(newValue)}
        inputValue={inputZone}
        renderInput={(params) => (
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevent the default form submission
              handleZoneSubmit(inputZone);
            }}
          >
            <TextField
              {...params}
              variant="standard"
              size="small"
              InputProps={{
                ...params.InputProps,
                className: 'autocomplete-input',
                // Use this to target the underline style
                classes: { notchedOutline: 'no-border' },
                style: {
                  // ... other styles you want to apply
                }
              }}
              placeholder=""
            />
          </form>
        )}
      />
    );
  };

  const [gates, setGates] = useState([
    {
      icon: (
        <div style={{ transform: 'rotate(135deg)' }}>
          <HorizontalRuleIcon color="success" fontSize="large" />
        </div>
      ),
      text: 'Entry'
    },
    {
      icon: (
        <div
          style={{
            transform: 'rotate(135deg)'
          }}
        >
          <HorizontalRuleIcon color="error" fontSize="large" />
        </div>
      ),
      text: 'Exit'
    }
  ]);

  const addEmptyGate = () => {
    setGates([...gates, { icon: <div className="h-full w-full rounded-full bg-yellow-500"></div>, text: '' }]);
  };

  const groundPlanes = [{ icon: <CheckSharpIcon color="success" fontSize="large" />, text: 'Set' }];

  const confirmRemoveZone = () => {
    const updatedZones = zones.filter((_, i) => i !== selectedZoneIndex);
    setZones(updatedZones);
    setIsModalOpen(false); // Close the modal
    setAutocompleteOptions(autocompleteOptions.filter((option) => option !== zones[selectedZoneIndex].text));
  };

  const openModal = (index) => {
    setIsModalOpen(true);
    setSelectedZoneIndex(index);
  };

  return (
    <div className=" rounded-lg p-2 text-white w-full h-full scrollbar overflow-y-scroll ">
      <div className="text-2xl font-semibold flex justify-between  mb-2">
        Environment Config
        <HighlightAltIcon fontSize="large" />
      </div>
      <div className="text-md flex justify-between">
        Zones
        <div onClick={addEmptyZone}>
          <AddCircleIcon />
        </div>
      </div>
      <div className="flex p-0 mb-4 flex-wrap">
        {zones.map((zone, index) => (
          <div key={index} className="text-sm flex items-center justify-left rounded-full bg-neutral-500 text-white p-[0.5rem] pr-2 m-1">
            <div className="flex items-center justify-center h-5 w-5 mr-1">{zone.icon}</div>
            <span>{zone.text}</span>
            <CancelIcon className="cursor-pointer" onClick={() => openModal(index)} style={{ marginLeft: '7px' }} />
          </div>
        ))}
        {showAutocomplete && (
          <div
            key="autocomplete"
            className="text-sm flex items-center justify-left rounded-full bg-neutral-500 text-white p-[0.5rem] pr-2 m-1"
          >
            <span>{renderAutocompleteForZones()}</span>
          </div>
        )}
      </div>
      <div className=" flex justify-between">
        Gates
        <div onClick={addEmptyGate}>
          <AddCircleIcon />
        </div>
      </div>
      <div className="flex p-0 mb-4 flex-wrap">
        {gates.map((zone, index) => (
          <div key={index} className="text-sm flex items-center justify-left rounded-full bg-neutral-500 text-white p-[0.5rem] pr-2 m-2">
            <div className="flex items-center justify-center h-5 w-5 mr-1">{zone.icon}</div>
            <span>
              {zone.text !== '' ? (
                zone.text
              ) : (
                <form onSubmit={handleAddGates}>
                  <input
                    type="text"
                    value={inputGate}
                    onChange={handleGates}
                    className="bg-transparent outline-none text-white border-b w-10"
                    placeholder=""
                  />
                </form>
              )}
            </span>
          </div>
        ))}
      </div>
      <div className=" flex justify-between">Ground Plane</div>
      <div className="flex p-0">
        {groundPlanes.map((zone, index) => (
          <div key={index} className="text-sm flex items-center justify-left rounded-full bg-neutral-500 text-white p-1 pr-2 m-2">
            <div className="flex items-center justify-center h-6 w-6 mr-1">{zone.icon}</div>
            <span>{zone.text}</span>
          </div>
        ))}
      </div>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white border-2 border-black shadow-lg p-4 flex flex-col items-center gap-4">
          <h1 id="modal-modal-title" className="text-xl font-semibold text-center">
            Confirm Removal
          </h1>
          <p id="modal-modal-description" className="text-sm">
            Do you really want to remove this zone?
          </p>
          <div className="flex justify-center gap-2">
            <Button variant="outlined" color="success" onClick={confirmRemoveZone} className="mt-2">
              Yes
            </Button>
            <Button variant="outlined" color="error" onClick={() => setIsModalOpen(false)} className="mt-2">
              No
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={isDefineAreaModalOpen}
        onClose={() => setIsDefineAreaModalOpen(false)}
        aria-labelledby="define-area-modal-title"
        aria-describedby="define-area-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white border-2 border-black shadow-lg p-4 flex flex-col items-center gap-4">
          <h2 id="define-area-modal-title">Define Area</h2>
          <p id="define-area-modal-description">Please define the area of the {currentZoneName} zone in the above camera view.</p>
          <Button
            variant="contained"
            onClick={() => {
              setIsDefineAreaModalOpen(false);
              setIsAnnotation(true);
              onOkClick();
            }}
            className="mt-2"
          >
            OK
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Card;
