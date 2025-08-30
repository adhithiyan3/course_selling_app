// src/components/InputField.jsx
export default function InputField({ label, type="text", value, onChange }) {
  return (
    <div className="mb-3">
      <label className="block mb-1 font-medium">{label}</label>
      <input 
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}
