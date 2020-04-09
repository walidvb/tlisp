import React from 'react'
import DDSelect from '../../ui_components/DDSelect';

function mapCliquesToOptions(cliques) {
  return cliques.map(c => ({ value: c.id, label: c.name }));
}

export default function CliqueSelect({ cliques, onChange, className }) {
  const options = mapCliquesToOptions(cliques);
  return (
    <div className={["form-group", className]}>
      <label htmlFor={`cliques`}>Cliques</label>
      <DDSelect 
        placeholder="Select one or more clique to share to" 
        multiple={true} 
        options={options} 
        onChange={onChange}
        id={`cliques`} 
      />
      <span className={"hint"}>
        <div className="fa fa-info" />
                Share in your cliques
            </span>
    </div>
  )
};