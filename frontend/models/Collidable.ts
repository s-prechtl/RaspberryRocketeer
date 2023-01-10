interface Collidable {
    /**
     * Determines when two entities collide
     * @param o other entity
     */
    collides(o: Entity): boolean;
}