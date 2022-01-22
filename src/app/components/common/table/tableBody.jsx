import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// const twoDArray = [
//     ['[i][j]', '[i][j+1]', '...', '[i][j+n]'],
//     ['[i+1][j]', '[i+1][j+1]', '...', '[i+1][j+n]'],
//     ['...', '...', '...', '...'],
//     ['[i+m][j]', '[i+m][j+1]', '...', '[i+m][j+n]']
// ];
//
// for (let i = 0; i < twoDArray.length; i++) {
//     for (let j = 0; j < twoDArray.length; j++) {}
// }

const TableBody = ({ data, columns }) => {
    const renderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === 'function') {
                return component(item);
            }
            return component;
        }
        return _.get(item, columns[column].path);
    };
    return (
        <tbody>
            {data.map((item) => (
                <tr key={item._id}>
                    {Object.keys(columns).map((column) => (
                        <td key={column}>{renderContent(item, column)}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableBody;
