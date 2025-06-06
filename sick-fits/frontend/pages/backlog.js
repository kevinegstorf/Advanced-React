import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  flex: 1;
  padding: 1rem;
  border: 1px solid #ccc;
  margin: 0 1rem;
`;

const Item = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: grab;
`;

const BacklogPage = () => {
  const [backlog, setBacklog] = useState([
    'Sample Task One',
    'Sample Task Two',
    'Sample Task Three',
  ]);
  const [sprint, setSprint] = useState([]);

  function onDragStart(e, index, type) {
    e.dataTransfer.setData('index', index);
    e.dataTransfer.setData('type', type);
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  function onDrop(e, target) {
    e.preventDefault();
    const index = e.dataTransfer.getData('index');
    const type = e.dataTransfer.getData('type');

    if (type === 'backlog' && target === 'sprint') {
      const item = backlog[index];
      setBacklog(backlog.filter((_, i) => i !== Number(index)));
      setSprint([...sprint, item]);
    } else if (type === 'sprint' && target === 'backlog') {
      const item = sprint[index];
      setSprint(sprint.filter((_, i) => i !== Number(index)));
      setBacklog([...backlog, item]);
    }
  }

  return (
    <Container>
      <Column onDragOver={onDragOver} onDrop={e => onDrop(e, 'backlog')}>
        <h2>Backlog</h2>
        {backlog.map((task, index) => (
          <Item
            key={index}
            draggable
            onDragStart={e => onDragStart(e, index, 'backlog')}
          >
            {task}
          </Item>
        ))}
      </Column>
      <Column onDragOver={onDragOver} onDrop={e => onDrop(e, 'sprint')}>
        <h2>Current Sprint</h2>
        {sprint.map((task, index) => (
          <Item
            key={index}
            draggable
            onDragStart={e => onDragStart(e, index, 'sprint')}
          >
            {task}
          </Item>
        ))}
      </Column>
    </Container>
  );
};

export default BacklogPage;
