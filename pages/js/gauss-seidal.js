var gaussSeidel = {
    parseInput: function() {
        var matrix = [];
        var rows = document.querySelectorAll('#soal tbody tr');
        rows.forEach(function(row) {
            var values = [];
            row.querySelectorAll('input').forEach(function(input) {
                values.push(parseFloat(input.value));
            });
            matrix.push(values);
        });
        return matrix;
    },
    parseInitialValues: function() {
        var initialValues = [];
        document.querySelectorAll('.nilai-awal tbody tr td input').forEach(function(input) {
            initialValues.push(parseFloat(input.value));
        });
        return initialValues;
    },
    calculate: function() {
        var matrix = gaussSeidel.parseInput();
        var initialValues = gaussSeidel.parseInitialValues();
        var tolerance = parseFloat(document.getElementById('toleransi').value);
        var newValues = [];
        var maxIterations = 1000; 
        var iterations = 0;

        while (true) {
            for (var i = 0; i < matrix.length; i++) {
                var sum = matrix[i][matrix[i].length - 1]; 
                for (var j = 0; j < matrix[i].length - 1; j++) {
                    if (j !== i) {
                        sum -= matrix[i][j] * initialValues[j]; 
                    }
                }
                newValues[i] = sum / matrix[i][i];
            }

            var maxDifference = 0;
            for (var i = 0; i < initialValues.length; i++) {
                var difference = Math.abs(newValues[i] - initialValues[i]);
                if (difference > maxDifference) {
                    maxDifference = difference;
                }
            }

            iterations++;
            if (maxDifference < tolerance || iterations >= maxIterations) {
                break;
            }

            initialValues = newValues.slice();
        }

        return {
            values: newValues,
            iterations: iterations
        };
    },
    displayResult: function(result) {
        var output = '<p>Hasil:</p><ul>';
        result.values.forEach(function(value, index) {
            output += '<li>X' + (index + 1) + ': ' + value.toFixed(6) + '</li>';
        });
        output += '<li>Jumlah Iterasi: ' + result.iterations + '</li></ul>';
        document.getElementById('result3').innerHTML = output;
    }
};

document.getElementById('hitungButton').addEventListener('click', function() {
    var result = gaussSeidel.calculate();
    gaussSeidel.displayResult(result);
});
