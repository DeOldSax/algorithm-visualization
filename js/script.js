$(document).ready(function() {
    var a = [9, 3, 8, 2, 10, 11, 17, 4, 0, 33, 17, 3];

    $('#insertionsort').click(function() {
        startInsertionSort(a);
    });

});

function startInsertionSort(a) {
    console.log(a.join(", "));

    var valueToInsert;

    for (var i = 1; i < a.length; i++) {
        valueToInsert = i;

        while (valueToInsert > 0 && a[valueToInsert-1] > a[valueToInsert]) {
            swap(a, valueToInsert-1, valueToInsert);
            valueToInsert--;
        }
    }

    console.log(a.join(", "));
    console.log("swaps: " + swaps);
}

swaps = 0;
function swap(a, i, j) {
    var t = a[i];
    a[i] = a[j];
    a[j] = t;
    swaps++;
}
