let detectDeterminantZeroError = (matrixWithVariableSeperated) => {
    let coeffiecientMatrix = matrixWithVariableSeperated[0];
    let constantMatrix = matrixWithVariableSeperated[2];

    for (let i = 0; i < coeffiecientMatrix.height; i++) {
        let rowArr = coeffiecientMatrix.value[i].map(frac => frac.value());
        rowArr.push(constantMatrix.value[i][0].value()); // constant matrix is added in the end hence after division by GCD is should be seperated
        let gcdOfNum = gcd(rowArr);
        for (let ii = 0; ii < rowArr.length; ii++) {
            let elm = rowArr[ii];
            let tempElm = `${elm}`.match(/(?:[.]).*/g);
            if (tempElm) {
                let noOfTensToMultiply = Math.pow(10, tempElm.length);
                rowArr[ii] = (elm * noOfTensToMultiply) / (gcdOfNum * noOfTensToMultiply);
            } else {
                rowArr[ii] = elm / gcdOfNum;
            }
        }
        rowArr.forEach((num, ii) => {
            if (ii === rowArr.length-1) {
                // constant matrix was added in the end hence after division by GCD is should be seperated
                constantMatrix.value[i][0] = new Fraction(num);
            }
            else {
                coeffiecientMatrix.value[i][ii] = new Fraction(num);
            }
        })
    }

    let parallel = false;
    let coincident = false;
    coeffiecientMatrix.value.forEach((ref1_row, ref1_row_index) => {
        for (let i = ref1_row_index + 1; i < coeffiecientMatrix.height; i++) {
            ref2_row = coeffiecientMatrix.value[i];
            let noOfCoeffEqual = 0;
            ref1_row.forEach((elm, cell_index) => {
                if (elm.isEqual(ref2_row[cell_index])) {
                    noOfCoeffEqual++;
                }
            })
            if (noOfCoeffEqual === ref1_row.length) {
                if (constantMatrix.value[ref1_row_index][0].isEqual(constantMatrix.value[i][0])) {
                    coincident = true;
                }
                else {
                    parallel = true;
                }
            }
            if (coincident && parallel) break;
        }
    });

    let err_caught = [];
    if (parallel && coincident) {
        err_caught = [
            "NO SOLUTION EXIST",
            "Parallel curves are detected",
            "Coincident curves are detected",
            "System of Equation is INCONSISTENT",
            "Enter another Equations to get the Unique Solution"
        ];
    } else if (parallel) {
        err_caught = [
            "NO SOLUTION EXIST",
            "Parallel curves are detected",
            "System of Equation is INCONSISTENT",
            "Enter another Equations to get the Unique Solution"
        ];
    } else if (coincident) {
        err_caught = [
            "INFINITE SOLUTION EXIST",
            "Coincident curves are detected",
            "Enter another Equations to get the Unique Solution"
        ];
    } else {
        err_caught = [
            "ERROR",
            "Some Unexpected Error has occured!",
            "The system of equation may have no solution or infinite Solution",
            "Please send these equations to me",
            "Enter another Equations to get the Unique Solution"
        ];
    }
    return err_caught;
};
