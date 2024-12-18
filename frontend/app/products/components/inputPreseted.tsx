import React, { useState, useRef } from 'react';

export const InputSelect: React.FC<{ 
  options: string[]; 
  value: string; 
  placeholder:string;
  onChange: (value: string) => void; 
  onBlur: () => void; 
}> = ({ options, value, onChange, onBlur,placeholder }) => {
  const [query, setQuery] = useState(value);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
    setIsOpen(true);
    onChange(inputValue); // Passa o valor para o formulário
  };

  const handleSelectOption = (option: string) => {
    setQuery(option);
    onChange(option); // Passa o valor selecionado para o formulário
    setIsOpen(false); // Fecha o dropdown
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    if (event.key === 'ArrowDown') {
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : 0
      );
    } else if (event.key === 'ArrowUp') {
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredOptions.length - 1
      );
    } else if (event.key === 'Enter') {
      if (highlightedIndex >= 0) {
        handleSelectOption(filteredOptions[highlightedIndex]);
      }
    } else if (event.key === 'Escape') {
      setIsOpen(false); // Fecha o dropdown ao pressionar "Escape"
    }
  };

  // Fecha o dropdown ao perder o foco
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.relatedTarget as Node)
    ) {
      setIsOpen(false);
      onBlur(); // Notifica o React Hook Form
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-10/12"
      tabIndex={-1} // Permite que o container detecte foco e blur
      onBlur={handleBlur}
    >
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className="w-full p-2 border rounded"
      />
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-10 w-full bg-white border rounded shadow-md max-h-40 overflow-y-auto">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelectOption(option)}
              className={`px-4 py-2 cursor-pointer ${
                highlightedIndex === index ? 'bg-gray-200' : ''
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
