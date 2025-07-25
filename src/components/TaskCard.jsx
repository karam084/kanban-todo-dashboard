import { Paper, Typography } from "@mui/material";

const TaskCard = ({ task }) => (
  <Paper sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
    <Typography variant="subtitle1" fontWeight={600}>{task.title}</Typography>
        border: "1px solid #ddd",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={600} color="primary.dark">
          {titleMap[column]}
        </Typography>
        <Button onClick={() => setOpen(true)} variant="contained" size="small">
          + Add
        </Button>
      </Box>
      <Droppable droppableId={column}>
        {(provided) => (
          <Stack
            spacing={2}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {filtered.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            <div ref={observerRef} />
            {isFetchingNextPage && <CircularProgress size={20} sx={{ mt: 2 }} />}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
      <TaskFormModal open={open} handleClose={() => setOpen(false)} column={column} />
    </Paper>
  );
};

export default Column;