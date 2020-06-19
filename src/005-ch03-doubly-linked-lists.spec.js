function Node(data = null, prev = null, next = null) {
  this.data = data
  this.prev = prev
  this.next = next
}

function DLinkedList() {
  const topSentinel = new Node()
  const bottomSentinel = new Node()

  topSentinel.next = bottomSentinel
  bottomSentinel.prev = topSentinel

  this.head = topSentinel
}
DLinkedList.prototype.insertAtBeginning = function (data) {
  const newNode = new Node(data)
  const afterMe = this.head
  const beforeMe = this.head.next
  // update next links
  afterMe.next = newNode
  newNode.next = beforeMe
  // update prev links
  newNode.prev = this.head
  beforeMe.prev = newNode
}
DLinkedList.prototype.insertAtEnd = function (data) {
  const newNode = new Node(data)
  let pointer = this.head

  let afterMe
  let beforeMe

  while (pointer.next) {
    if (!pointer.next.next) {
      afterMe = pointer
      beforeMe = pointer.next
    }
    pointer = pointer.next
  }

  // update next links
  afterMe.next = newNode
  newNode.next = beforeMe
  // update prev links
  newNode.prev = afterMe
  beforeMe.prev = newNode
}
DLinkedList.prototype.insertSorted = function (data) {
  const newNode = new Node(data)

  let afterMe
  let beforeMe
  let pointer = this.head

  while (pointer) {
    const nextIsEndSentinel = pointer.next.data === null
    const nextHasBiggerData = pointer.next.data > data

    if (nextIsEndSentinel || nextHasBiggerData) {
      afterMe = pointer
      beforeMe = pointer.next
      break
    }
    pointer = pointer.next
  }

  // update next links
  afterMe.next = newNode
  newNode.next = beforeMe
  // update prev links
  newNode.prev = afterMe
  beforeMe.prev = newNode
}
DLinkedList.prototype.findNodeMTF = function (data) {
  let pointer = this.head
  while (pointer.next) {
    if (pointer.data === data) {
      if (pointer !== this.head.next) {
        // MOVE THE FOUND NODE TO THE FRONT OF THE LIST
        // connect before and after
        let beforeNode = pointer.prev
        let afterNode = pointer.next
        beforeNode.next = afterNode
        afterNode.prev = beforeNode
        // put node after top sentinel
        beforeNode = this.head
        afterNode = this.head.next
        // update next links
        beforeNode.next = pointer
        pointer.next = afterNode
        // update prev links
        pointer.prev = beforeNode
        afterNode.prev = pointer
      }
      return pointer
    }
    pointer = pointer.next
  }
  return null
}

describe('doubly linked lists', () => {
  let dlinkedList

  beforeEach(() => rebuildList('c', 'b', 'a'))

  function rebuildList(...items) {
    dlinkedList = new DLinkedList()
    if (!items.length) return

    items.forEach(item => {
      dlinkedList.insertAtBeginning(item)
    })
  }

  it('can make a Node', () => {
    expect(new Node('foo')).toEqual({ data: 'foo', prev: null, next: null })
  })

  it('can make a Doubly Linked List', () => {
    const doublyLinkedList = new DLinkedList()
    expect(doublyLinkedList.head.prev).toEqual(null)
    expect(doublyLinkedList.head.next.next).toEqual(null)
    expect(doublyLinkedList.head.next.prev).toEqual(doublyLinkedList.head)
  })

  it('can add nodes at the beginning', () => {
    const doublyLinkedList = new DLinkedList()
    doublyLinkedList.insertAtBeginning('c')
    doublyLinkedList.insertAtBeginning('b')
    doublyLinkedList.insertAtBeginning('a')
    expect(doublyLinkedList.head.next.data).toBe('a')
    expect(doublyLinkedList.head.next.next.data).toBe('b')
    expect(doublyLinkedList.head.next.next.next.data).toBe('c')
    expect(doublyLinkedList.head.next.next.next.next.data).toBe(null)
    expect(doublyLinkedList.head.next.next.next.prev.data).toBe('b')
    expect(doublyLinkedList.head.next.next.next.prev.prev.data).toBe('a')
    expect(doublyLinkedList.head.next.next.next.prev.prev.prev.data).toBe(null)
  })

  it('can add nodes at the end', () => {
    const doublyLinkedList = new DLinkedList()
    doublyLinkedList.insertAtEnd('a')
    doublyLinkedList.insertAtEnd('b')
    doublyLinkedList.insertAtEnd('c')
    expect(doublyLinkedList.head.next.data).toBe('a')
    expect(doublyLinkedList.head.next.next.data).toBe('b')
    expect(doublyLinkedList.head.next.next.next.data).toBe('c')
    expect(doublyLinkedList.head.next.next.next.next.data).toBe(null)
    expect(doublyLinkedList.head.next.next.next.prev.data).toBe('b')
    expect(doublyLinkedList.head.next.next.next.prev.prev.data).toBe('a')
    expect(doublyLinkedList.head.next.next.next.prev.prev.prev.data).toBe(null)
  })


  it('rebuildList helper works', () => {
    expect(dlinkedList.head.next.data).toBe('a')
    expect(dlinkedList.head.next.next.data).toBe('b')
    expect(dlinkedList.head.next.next.next.data).toBe('c')
    expect(dlinkedList.head.next.next.next.next.data).toBe(null)
    expect(dlinkedList.head.next.next.next.prev.data).toBe('b')
    expect(dlinkedList.head.next.next.next.prev.prev.data).toBe('a')
    expect(dlinkedList.head.next.next.next.prev.prev.prev.data).toBe(null)
  })

  it('insertSorted inserts numbers in order', () => {
    const dlinkedList = new DLinkedList()

    const num1 = Math.floor(Math.random() * 10)
    const num2 = Math.floor(Math.random() * 10)
    const num3 = Math.floor(Math.random() * 10)

    const unsorted = [num1, num2, num3]
    const sorted = [...unsorted].sort((a, b) => a - b)

    dlinkedList.insertSorted(unsorted[0])
    expect(dlinkedList.head.next.data).toBe(unsorted[0])

    dlinkedList.insertSorted(unsorted[1])
    dlinkedList.insertSorted(unsorted[2])

    expect(dlinkedList.head.next.data).toBe(sorted[0])
    expect(dlinkedList.head.next.next.data).toBe(sorted[1])
    expect(dlinkedList.head.next.next.next.data).toBe(sorted[2])
    expect(dlinkedList.head.next.next.next.next.data).toBe(null)
    expect(dlinkedList.head.next.next.next.prev.data).toBe(sorted[1])
    expect(dlinkedList.head.next.next.next.prev.prev.data).toBe(sorted[0])
    expect(dlinkedList.head.next.next.next.prev.prev.prev.data).toBe(null)
  })

  it('findNodeMTF finds node by data', () => {
    rebuildList(1, 2, 3, 4, 5)
    const nodeFive = dlinkedList.head.next
    expect(dlinkedList.findNodeMTF(5)).toEqual(nodeFive)
  })

  it('findNodeMTF returns null if data not found', () => {
    rebuildList(1, 2, 3, 4, 5)
    expect(dlinkedList.findNodeMTF(6)).toEqual(null)
  })

  it('findNodeMTF moves the latest node searched to the front of the list', () => {
    rebuildList(1, 2, 3, 4)

    expect(dlinkedList.head.next.data).toBe(4)
    expect(dlinkedList.head.next.next.data).toBe(3)
    expect(dlinkedList.head.next.next.next.data).toBe(2)
    expect(dlinkedList.head.next.next.next.next.data).toBe(1)
    expect(dlinkedList.head.next.next.next.next.next.data).toBe(null)

    dlinkedList.findNodeMTF(5)
    dlinkedList.findNodeMTF(4)
    dlinkedList.findNodeMTF(3)
    dlinkedList.findNodeMTF(2)
    dlinkedList.findNodeMTF(1)

    expect(dlinkedList.head.next.data).toBe(1)
    expect(dlinkedList.head.next.next.data).toBe(2)
    expect(dlinkedList.head.next.next.next.data).toBe(3)
    expect(dlinkedList.head.next.next.next.next.data).toBe(4)
    expect(dlinkedList.head.next.next.next.next.next.data).toBe(null)
    expect(dlinkedList.head.next.next.next.next.next.prev.data).toBe(4)
    expect(dlinkedList.head.next.next.next.next.next.prev.prev.data).toBe(3)
    expect(dlinkedList.head.next.next.next.next.next.prev.prev.prev.data).toBe(2)
    expect(dlinkedList.head.next.next.next.next.next.prev.prev.prev.prev.data).toBe(1)
    expect(dlinkedList.head.next.next.next.next.next.prev.prev.prev.prev.prev.data).toBe(null)
  })
})
