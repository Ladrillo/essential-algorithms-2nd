import { Node, LinkedList } from '../004-ch03-linked-lists'

describe('Linked Lists', () => {
  let linkedList

  beforeEach(() => rebuildLinkedList('c', 'b', 'a'))

  function rebuildLinkedList(...items) {
    linkedList = new LinkedList()
    if (!items.length) return

    items.forEach(item => {
      linkedList.insertAtBeginning(item)
    })
  }

  test('Node can make a new node', () => {
    let newNode = new Node('x')
    expect(newNode.data).toBe('x')
    expect(newNode.next).toBe(null)
  })

  test('LinkedList can make a new Linked List', () => {
    linkedList = new LinkedList()
    const sentinel = { next: null }

    expect(linkedList.head).toEqual(sentinel)
    expect(linkedList.head.next).toBe(null)
  })

  test('insertAtBeginning can insert at the beginning', () => {
    linkedList = new LinkedList()

    linkedList.insertAtBeginning('c')
    linkedList.insertAtBeginning('b')
    linkedList.insertAtBeginning('a')

    expect(linkedList.head.next.data).toBe('a')
    expect(linkedList.head.next.next.data).toBe('b')
    expect(linkedList.head.next.next.next.data).toBe('c')
    expect(linkedList.head.next.next.next.next).toBe(null)
  })

  test('iterate can iterate over a Linked List', () => {
    expect(linkedList.iterate()).toEqual(['a', 'b', 'c'])
  })

  test('findNode can find a node in the Linked List', () => {
    expect(linkedList.findNode('a')).toEqual(linkedList.head.next)
    expect(linkedList.findNode('b')).toEqual(linkedList.head.next.next)
    expect(linkedList.findNode('c')).toEqual(linkedList.head.next.next.next)
    expect(linkedList.findNode('x')).toBe(null)
  })

  test('findNodeBefore can find a node before in the Linked List', () => {
    expect(linkedList.findNodeBefore('a')).toEqual(linkedList.head) // sentinel
    expect(linkedList.findNodeBefore('b')).toEqual(linkedList.head.next)
    expect(linkedList.findNodeBefore('c')).toEqual(linkedList.head.next.next)
    expect(linkedList.findNodeBefore('x')).toBe(null)
  })

  test('insertAtEnd can insert at the end', () => {
    linkedList.insertAtEnd('d')

    expect(linkedList.findNode('d').next).toBe(null)
    expect(linkedList.iterate()).toEqual(['a', 'b', 'c', 'd'])
  })

  test('insertAtEnd works with empty linked list', () => {
    rebuildLinkedList()
    linkedList.insertAtEnd('a')

    expect(linkedList.findNode('a').next).toBe(null)
    expect(linkedList.iterate()).toEqual(['a'])
  })

  test('insertAtEnd can make a loop', () => {
    rebuildLinkedList('b', 'a')
    linkedList.insertAtEnd('c', true)
    expect(linkedList.head.next.next.next.data).toBe('c')
    expect(linkedList.head.next.next.next.next.data).toBe(undefined) // sentinel
    expect(linkedList.head.next.next.next.next.next.data).toBe('a')
  })

  test('insertAfterNode can insert after a certain Node', () => {
    const bNode = linkedList.head.next.next
    linkedList.insertAfterNode(bNode, 'x')
    expect(linkedList.iterate()).toEqual(['a', 'b', 'x', 'c'])
  })

  test('delete node can delete node from linked list', () => {
    const aNode = linkedList.head.next
    linkedList.deleteNode(aNode)
    expect(linkedList.iterate()).toEqual(['b', 'c'])

    rebuildLinkedList('c', 'b', 'a')

    const bNode = linkedList.head.next.next
    linkedList.deleteNode(bNode)
    expect(linkedList.iterate()).toEqual(['a', 'c'])

    rebuildLinkedList('c', 'b', 'a')

    const cNode = linkedList.head.next.next.next
    linkedList.deleteNode(cNode)
    expect(linkedList.iterate()).toEqual(['a', 'b'])
  })

  test('delete node empties out the deleted node', () => {
    const bNode = linkedList.head.next.next
    linkedList.deleteNode(bNode)
    expect(bNode).toEqual({})
  })

  test('copy returns an instance of Linked List', () => {
    const copy = linkedList.copy()
    expect(copy).toBeInstanceOf(LinkedList)
  })

  test('copy returns a different instance of LinkedList', () => {
    const copy = linkedList.copy()
    expect(copy).not.toBe(linkedList)
  })

  test('copy returns a copy', () => {
    const copy = linkedList.copy()
    expect(copy).toEqual(linkedList)

    expect(copy.head.next.data).toBe('a')
    expect(copy.head.next.next.data).toBe('b')
    expect(copy.head.next.next.next.data).toBe('c')
    expect(copy.head.next.next.next.next).toBe(null)
  })
})
