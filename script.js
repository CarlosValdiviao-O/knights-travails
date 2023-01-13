//first
const gameBoard = (arr) => {
    let boxes = [];
    for (let i = 0; i < 8; i++) {
        boxes[i] = [];
        for (let j = 0; j < 8; j++)
            boxes[i][j] = true;
    }
    if (arr) {
        arr.forEach(pair => {
            boxes[pair[0]][pair[1]] = false;
        })
    }
    return boxes;
}

const knight = (start) => {
    let x = start[0];
    let y = start[1];
    let moves = [];
    moves.push([x+2,y-1]);
    moves.push([x+2,y+1]);
    moves.push([x-2,y-1]);
    moves.push([x-2,y+1]);
    moves.push([x-1,y+2]);
    moves.push([x+1,y+2]);
    moves.push([x-1,y-2]);
    moves.push([x+1,y-2]);
    return moves;
}

const checkValid = (arr) => {
    return arr[0] > -1 && arr[0] < 8 && arr[1] > -1 && arr[1] < 8;
}

const knightTravails = (start, end) => {
    console.log('Building tree')
    let root = buildTree(start, end);
    console.log('Searching')
    let answer = findShortest(root, end);
    console.log(`Path found in ${answer.count} moves. Path:`);
    answer.visited.forEach(pair => {
        console.log(pair);
    })
}

const findShortest = (current, end, count = 0, visited = []) => {
    if (current.data[0] === end[0] && current.data[1] === end[1])
        return {
            count,
            visited: visited.concat([current.data]),
        }
    if (current.next.length === 0)
        return {
            count: 100,
            visited,
        }
    let scores = [];
    for (let i = 0; i < current.next.length; i++) {
        scores.push(findShortest(current.next[i], end, count +1, visited.concat([current.data])))
    }
    scores.sort(function (a, b) {
        return a.count - b.count;
    })
    return scores[0];
}

const buildTree = (start, end, visited = []) => {
    let root = node(start);
    visited = visited.concat([start]);
    let newBoard = gameBoard(visited);
    if (end[0] === start[0] && end[1] === start[1] || visited.length > 10)
        return root;
    let knightMoves = knight(start);
    let validMoves = [];
    knightMoves.forEach(pair => {
        if (checkValid(pair) && newBoard[pair[0]][pair[1]] === true)
            validMoves.push(pair);
    })
    validMoves.forEach(pair => {
        root.next.push(buildTree(pair, end, visited));
    })
    return root;
}

const node = (arr) => {
    const data = arr;
    const next = [];

    return { data, next }
}

//second

const knightTravails2 = (start, end) => {
    console.log('Building Tree');
    let root = buildTree2(start, end);
    console.log(root);
    console.log('Searching')
    let answer = findShortest(root, end);
    console.log(`Path found in ${answer.count} moves. Path:`);
    answer.visited.forEach(pair => {
        console.log(pair);
    })
}

const buildTree2 = (start, end, visited = [], limit = 63) => {
    let root = node2(start);
    visited = visited.concat([start]);
    root.limit = limit;
    let newBoard = gameBoard(visited);
    if (end[0] === start[0] && end[1] === start[1] || visited.length >= limit) {
        root.limit = visited.length;
        return root;
    }
    let knightMoves = knight(start);
    let validMoves = [];
    knightMoves.forEach(pair => {
        if (checkValid(pair) && newBoard[pair[0]][pair[1]] === true)
            validMoves.push(pair);
    })
    for (let i = 0; i < validMoves.length; i++){
        if (root.limit > visited.length) {
            root.next.push(buildTree2(validMoves[i], end, visited, root.limit));
            if (root.next[i].limit < root.limit)
                root.limit = root.next[i].limit;
        }
    }
    return root;
}

const node2 = (arr) => {
    const data = arr;
    const next = [];
    const limit = 63;

    return { data, next, limit }
}


//three

const tree = new Map();

const knightTravails3 = (start, end) => {
    if (tree.size === 0) 
        fillTree();
    let answer = findShortest2(start, end);
    console.log(`Path found in ${answer.count} moves. Path:`);
    answer.visited.forEach(pair => {
        console.log(pair);
    })
}

const fillTree = () => {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let knightMoves = knight([i,j]);
            let validMoves = [];
            knightMoves.forEach(pair => {
                if (checkValid(pair))
                    validMoves.push(`${pair[0]}${pair[1]}`);
            })
            tree.set(`${i}${j}`, validMoves)
        }
    }
}

const findShortest2 = (current, end) => {
    let queue = [];
    queue[0] = {
        current,
        count: 0,
        visited: [current],
    }
    while (queue.length > 0) {
        let {current, count, visited} = queue[0];
        if (current[0] === end[0] && current[1] === end[1])
            return queue[0];
        let isVisited = false;
        visited.forEach((pair, index) => {
            if (current[0] === pair[0] && current[1] === pair[1] && index !== visited.length - 1) {
                isVisited = true;
            }
        })
        if (!isVisited) {
            let nextMoves = tree.get(`${current[0]}${current[1]}`);
            nextMoves.forEach(pair => {
                queue.push({
                    current: [+pair[0], +pair[1]],
                    count: count + 1,
                    visited: visited.concat([[+pair[0], +pair[1]]]),
                })
            })
        }
        queue.shift();
    }
}