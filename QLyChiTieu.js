var prompt = require('prompt-sync')({sigint: true});
var fs = require('fs-promise')

/**
 * mặt hàng
 * giá
 * phí
 * ngày chi
 * */

function requireInput(msg) {
    var input = prompt(msg);
    if (!input) {
        requireInput(input, msg)
    } else {
        return input
    }
}

function showListProduct() {
    var dataWarehouse = fs.readFileSync('dulieu/chiTieu.json', { encoding: 'utf-8' })
    dataWarehouse = JSON.parse(dataWarehouse);
    for(i = 0; i < dataWarehouse.length; i++)
        console.log("* Mặt hàng " + i + ":\n\tTên mặt hàng: " + dataWarehouse[i]["PrName"] + "\n\tGiá: " + dataWarehouse[i]["PrPrice"] + "\n\tPhí vận chuyển: " + dataWarehouse[i]["Delivery"] + "\n\tThời gian thanh toán: " + dataWarehouse[i]["createdAt"]);
    printMenu()
}

function findProduct() {
    var PrName
    PrName = requireInput('Mời nhập tên sản phẩm bạn muốn tìm: ');
    var dataWarehouse = fs.readFileSync('dulieu/chiTieu.json', { encoding: 'utf-8' })
    dataWarehouse = JSON.parse(dataWarehouse);
    for(i = 0; i < dataWarehouse.length; i++)
        if(dataWarehouse[i].PrName == PrName)
            console.log("* Mặt hàng " + i + ":\n\tTên mặt hàng: " + dataWarehouse[i]["PrName"] + "\n\tGiá: " + dataWarehouse[i]["PrPrice"] + "\n\tPhí vận chuyển: " + dataWarehouse[i]["Delivery"] + "\n\tThời gian thanh toán: " + dataWarehouse[i]["createdAt"]);
    printMenu()
}

function UpdateProduct() {
    var PrName, PrPrice, Delivery
    PrName = requireInput('Mời nhập mặt hàng muốn chỉnh sửa: ');

    
    var dataWarehouse = fs.readFileSync('dulieu/chiTieu.json', { encoding: 'utf-8' })
    dataWarehouse = JSON.parse(dataWarehouse)
    for(i = 0; i < dataWarehouse.length; i++) {
        if(dataWarehouse[i].PrName == PrName) {
            var NewPrName = requireInput('Mời nhập mặt hàng: ');
            var NewPrPrice = requireInput('Mời nhập giá: ');
            var NewDelivery = requireInput('Mời nhập phí giao hàng: ');
            dataWarehouse[i].PrName = NewPrName;
            dataWarehouse[i].PrPrice = NewPrPrice;
            dataWarehouse[i].Delivery = NewDelivery;
        }
    }
    fs.writeFileSync('dulieu/chiTieu.json', JSON.stringify(dataWarehouse), { encoding: 'utf-8' })
    console.log('--- Xóa thành công! ---')
    printMenu()

}

function addProduct() {
    var PrName, PrPrice, Delivery
    PrName = requireInput('Mời nhập mặt hàng: ');
    PrPrice = requireInput('Mời nhập giá: ');
    Delivery = requireInput('Mời nhập phí giao hàng: ');

    var PrData = {
        PrName: PrName,
        PrPrice: PrPrice,
        Delivery: Delivery,
        createdAt: new Date()
    }

    var dataWarehouse = fs.readFileSync('dulieu/chiTieu.json', { encoding: 'utf-8' })
    dataWarehouse = JSON.parse(dataWarehouse)
    dataWarehouse.push(PrData)
    fs.writeFileSync('dulieu/chiTieu.json', JSON.stringify(dataWarehouse), { encoding: 'utf-8' })
    console.log('--- Lưu thành công. ---')
    printMenu()

}

function deleteProduct() {
    var PrName
    PrName = requireInput('Mời nhập tên mặt hàng muốn xóa: ');

    var dataWarehouse = fs.readFileSync('dulieu/chiTieu.json', { encoding: 'utf-8' })
    dataWarehouse = JSON.parse(dataWarehouse)
    dataWarehouse = dataWarehouse.filter(dataWarehouse => dataWarehouse.PrName !== PrName);
    fs.writeFileSync('dulieu/chiTieu.json', JSON.stringify(dataWarehouse), { encoding: 'utf-8' })
    console.log('--- Xóa thành công! ---')
    printMenu()

}


function printMenu() {
    var menu = "> 1. Xem danh sách\n  2. Tìm kiếm\n  3. Cập nhật\n  4. Thêm mặt hàng\n  5. Xoá mặt hàng \n  0. Thoát"
    console.log(menu)
    var input = requireInput('Mời chọn chức năng: ')
    input = parseInt(input)

    switch (input) {
    case 1:
        showListProduct()
        break 
    case 2:
        findProduct()
        break 
    case 3:
        UpdateProduct()
        break
    case 4:
        addProduct()
        break 
    case 5:
        deleteProduct()
        break
    case 0:
        console.log('Tạm biệt!')
        break 
    default:
        printMenu()
        break
    }
}


function main() {
    printMenu()
}

main()