'use strict';
var gaussJordan = {
	tools:{
		cleanArray: function(arr) {
			for (var i = arr.length - 1; i >= 0; i--){
				if(arr[i] === "" || arr[i] === undefined || arr[i] === null){
					arr.splice(i, 1);
				}
			}
			return arr;
		}
	},
	ui: {
		clearContent: function(containerid){
			document.getElementById(containerid).innerText = '';
		},
		writeMatrix: function(containerid, mtr){
			for (var i = 0; i < mtr.length; i++) {
				var row = mtr[i];
				for (var j = 0; j < row.length; j++) {
					document.getElementById(containerid).innerHTML += row[j] + ' ';
					if(j == row.length-2){
						document.getElementById(containerid).innerHTML += ' = ';
					}
				}
				document.getElementById(containerid).innerText += '\n';
			}
			document.getElementById(containerid).innerText += '\n';
	},
	writeResult: function(containerid, row){
		for (var i = 0; i < row.length; i++) {
			if (!isNaN(parseFloat(row[i]))){
				var identifier = String.fromCharCode(97 + i);
				document.getElementById(containerid).innerText += identifier + ' = ' + row[i] + '\n';
			}
		}
	},
	stringToMatrix: function(str){
			var result = str.trim().replace(/\+/g, "").replace(/\=/g, "").split('\n');
			for (var i = 0; i < result.length; i++) {
				result[i] = result[i].split(' ');
				result[i] = gaussJordan.tools.cleanArray(result[i]);

				for (var j = 0; j < result[i].length; j++) {
					result[i][j] = JSON.parse(result[i][j]);
				}
			}
			console.log(result);
			return result;
		},
	},
	calculator:{
		validateMatrix: function(mtr){
			return  mtr != null && mtr != undefined 
			&& mtr.length+1 == mtr[0].length;
		},
		calcRows: function(row1, row2, id){
			var result = [];
			for (var i = 0; i < row1.length; i++) {
				var row1Res = row1[id] * row2[i];
				var row2Res = row2[id] * row1[i];
				result.push(row1Res - row2Res);
			}  
			return result;
		},
		calculateMatrix: function(mtr, outputId, advancedOutput){
			var runner = 0;
			var printedStep = 1;
			while(runner < mtr.length){
				advancedOutput && (document.getElementById(outputId).innerText += 'Eliminasi Baris ' + (runner+1) + ':\n');
				for (var i = 0; i < mtr.length; i++) {
					if(i != runner){
						mtr[i] = gaussJordan.calculator.calcRows(mtr[runner], mtr[i], runner);
						advancedOutput && (document.getElementById(outputId).innerText += 'Langkah ' + printedStep + ':\n');
						advancedOutput && (document.getElementById(outputId).innerText += 'Mengurangi baris ' + (runner+1) + ' dari ' + (i+1) + '\n');
						advancedOutput && gaussJordan.ui.writeMatrix(outputId, mtr);
						printedStep++;
					}
				}
				runner++;
			}
			!advancedOutput && gaussJordan.ui.writeMatrix(outputId, mtr);
		},
		resolveMatrixResults: function(mtr){
			var mtrResults = new Array(mtr[0].length-1);

			for (var i = 0; i < mtr.length; i++) {
				mtrResults[i] = mtr[i][mtr[i].length - 1] / mtr[i][i];
			}
			return mtrResults;
		}
	},
	calculateWholeMatrix: function(containerInputMatrix, containerOriginalMatrix, containerEliminatedMatrix, containerResult, advancedOutput){
		gaussJordan.ui.clearContent(containerOriginalMatrix);
		gaussJordan.ui.clearContent(containerEliminatedMatrix);
		gaussJordan.ui.clearContent(containerResult);
		var matrix = gaussJordan.ui.stringToMatrix(document.getElementById(containerInputMatrix).value);
		gaussJordan.ui.writeMatrix(containerOriginalMatrix, matrix);
		gaussJordan.calculator.calculateMatrix(matrix, containerEliminatedMatrix,  advancedOutput);
		matrix = gaussJordan.calculator.resolveMatrixResults(matrix);
		gaussJordan.ui.writeResult(containerResult, matrix);
	}
};
