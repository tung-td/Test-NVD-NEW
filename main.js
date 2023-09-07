$(document).ready(function () {
    var courses = [
        {

            id: '1',
            name: 'Javascript',
            description: 'Đây là khóa học Javascript cơ bản',
            coin: 100
        },
        {
            id: '2',
            name: 'HTML - CSS',
            description: 'Đây là khóa học HTML - CSS',
            coin: 200
        },
        {
            id: '3',
            name: 'ReactJS',
            description: 'Đây là khóa học ReactJS',
            coin: 0
        },
        {
            id: '4',
            name: 'NodeJS',
            description: 'Đây là khóa học NodeJS',
            coin: 300
        },
        {
            id: '5',
            name: 'PHP',
            description: 'Đây là khóa học PHP',
            coin: 150
        }
    ]

    function render(array) {
        var renderUl = $('.list-courses')
        var htmls = array.map(function (courses) {
            return `<li>
                    <h2>${courses.name}</h2>
                    <h3>Mô tả: ${courses.description}</h3>
                    <p>Giá: ${courses.coin}</p>
                    <button class="update-btn" data-id="${courses.id}">Sửa</button>
                    <button class="delete-btn" data-id="${courses.id}">Xóa</button>
                </li>`
        })
        renderUl.html(htmls.join(''))
    }

    render(courses)

    $('#create').click(function () {
        var check = true;
        if (isRequired($('input[name="name"]'))) {
            check = false
        }
        if (isRequired($('input[name="description"]'))) {
            check = false
        }
        if (isRequired($('input[name="coin"]'))) {
            check = false
        }
        if (check) {
            var newCr = {
                id: courses.length + 1,
                name: $('input[name="name"]').val(),
                description: $('input[name="description"]').val(),
                coin: $('input[name="coin"]').val()
            }
            courses.push(newCr)
            render(courses)
            $('input[name="name"]').val('')
            $('input[name="description"]').val('')
            $('input[name="coin"]').val('')
        }
    })

    var idN

    $('.list-courses').on('click', '.update-btn', function () {
        idN = $(this).data('id')
        var course = courses.find(function (crs) {
            return crs.id == idN
        })
        $('input[name="name"]').val(course.name)
        $('input[name="description"]').val(course.description)
        $('input[name="coin"]').val(course.coin)
        $('#create').hide()
        $('#update').show()
    })

    $('#update').click(function () {
        var course = {
            id: idN,
            name: $('input[name="name"]').val(),
            description: $('input[name="description"]').val(),
            coin: $('input[name="coin"]').val()
        }

        var indexCourse = courses.findIndex(function (course) {
            return idN == course.id
        })

        courses.splice(indexCourse, 1, course)
        render(courses)
        $('#update').hide()
        $('#create').show()
        $('input[name="name"]').val('')
        $('input[name="description"]').val('')
        $('input[name="coin"]').val('')
    })

    $('.list-courses').on('click', '.delete-btn', function () {
        var idCrouse = $(this).data('id')
        if (confirm("Bạn có muốn xóa?")) {
            var idCrouseNew = courses.findIndex(function (course) {
                return course.id = idCrouse
            })
            courses.splice(idCrouseNew, 1)
            render(courses)
        }
    })

    function isRequired(input) {
        var errElement = input.parent().find('.form-message');
        if (input.val().trim() === '') {
            errElement.css('display', 'block')
            errElement.css('color', 'red')
            errElement.text('Yêu cầu đăng nhập !')
            input.addClass('invalid')
            return true
        } else {
            errElement.css('display', 'none')
            input.removeClass('invalid')
            return false
        }
    }

    function checkValidate(input) {
        var errorMessage = input.parentElement.querySelector('.form-message')
        input.onblur = function () {
            if (input.value.trim() === '') {
                errorMessage.setAttribute('style', 'display: block; color: red;')
                errorMessage.innerText = 'Yêu cầu nhập!';
                input.classList.add('invalid')
            }
        }

        input.oninput = function () {
            errorMessage.setAttribute('style', 'display: none')
            input.classList.remove('invalid')
        }
    }

    var strCourse = document.querySelector('input[name="name"]')
    var strDesc = document.querySelector('input[name="description"]')
    var strCoin = document.querySelector('input[name="coin"]')

    checkValidate(strCourse)
    checkValidate(strDesc)
    checkValidate(strCoin)
});