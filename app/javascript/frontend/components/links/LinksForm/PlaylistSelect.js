import React from 'react'
import DDSelect from '../../ui_components/DDSelect';

export default function PlaylistSelect({ onChange, className, value, playlists }) {
    const options = playlists.map( pl => ({ value: pl.id, label: pl.name }));
    return (
        <div className={["form-group", className]}>
            <label htmlFor={`playlists`}>Playlists</label>
            <DDSelect 
              placeholder="Select or type to create one or more playlists" 
              creatable={true} 
              optionName="Create a new playlist..." 
              multiple={true} 
              options={options} 
              id={`playlists`} 
              value={value}
              onChange={onChange}
            />
            <span className={"hint"}>
                <div className="fa fa-info" />
                Add to an existing personal playlist or create one
            </span>
        </div>
    )
};