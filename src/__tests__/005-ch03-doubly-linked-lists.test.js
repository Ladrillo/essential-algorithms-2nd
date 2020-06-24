import { DNode, DLinkedList } from '../005-ch03-doubly-linked-lists'

describe('Doubly Linked Lists', () => {
  let dlinkedList

  beforeEach(() => rebuildList('c', 'b', 'a'))

  function rebuildList(...items) {
    dlinkedList = new DLinkedList()
    if (!items.length) return

    items.forEach(item => {
      dlinkedList.insertAtBeginning(item)
    })
  }

  test('can make a DNode', () => {
    expect(new DNode('foo')).toEqual({ data: 'foo', prev: null, next: null })
  })

  test('can make a Doubly Linked List', () => {
    const doublyLinkedList = new DLinkedList()
    expect(doublyLinkedList.head.prev).toEqual(null)
    expect(doublyLinkedList.head.next.next).toEqual(null)
    expect(doublyLinkedList.head.next.prev).toEqual(doublyLinkedList.head)
  })

  test('can add nodes at the beginning', () => {
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

  test('can add nodes at the end', () => {
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


  test('rebuildList helper works', () => {
    expect(dlinkedList.head.next.data).toBe('a')
    expect(dlinkedList.head.next.next.data).toBe('b')
    expect(dlinkedList.head.next.next.next.data).toBe('c')
    expect(dlinkedList.head.next.next.next.next.data).toBe(null)
    expect(dlinkedList.head.next.next.next.prev.data).toBe('b')
    expect(dlinkedList.head.next.next.next.prev.prev.data).toBe('a')
    expect(dlinkedList.head.next.next.next.prev.prev.prev.data).toBe(null)
  })

  test('insertSorted inserts numbers in order', () => {
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

  test('findNodeMTF finds node by data', () => {
    rebuildList(1, 2, 3, 4, 5)
    const nodeFive = dlinkedList.head.next
    expect(dlinkedList.findNodeMTF(5)).toEqual(nodeFive)
  })

  test('findNodeMTF returns null if data not found', () => {
    rebuildList(1, 2, 3, 4, 5)
    expect(dlinkedList.findNodeMTF(6)).toEqual(null)
  })

  test('findNodeMTF moves the latest node searched to the front of the list', () => {
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
