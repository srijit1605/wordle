import React from 'react';
import configs from '../../config';
import Square from '../Square/Square';
import './Wordgrid.css'

function Wordgrid() {
    const grid = new Array(configs.nRows).fill('').map(e => new Array(configs.nCols).fill(''));
    return (
        <div className='grid'>
            {grid.map((row, idx) => <div key={idx} className='gridRow'>
                {row.map((col, cIdx) => <Square key={cIdx} letterPos={cIdx} attemptNo={idx}/>)}
                </div>
            )}
        </div>
    )
}

export default Wordgrid