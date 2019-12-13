import jayessdb from './jayessdb';
import fsync from './jayessdb/adapters';

const adapter = fsync('db.json');
const db = jayessdb.bootstrap(adapter);

if (db.isEmpty()) {
  db
    .setDocuments({ attendanceRules: [] })
    .write()

  db
    .get('attendanceRules')
    .push({ id: 1, title: 'awesome' })
    .write()   
}